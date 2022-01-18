from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from bitcoinrpc.authproxy import AuthServiceProxy, JSONRPCException
import requests
import os
import os
from dotenv import load_dotenv

load_dotenv()

rpc_host = os.getenv('rpc_host')
rpc_port = os.getenv("rpc_port")
rpc_user = os.getenv("rpc_user")
rpc_password = os.getenv("rpc_password")


def latest_blocks(request):
    rpc_connection = AuthServiceProxy(
        "http://%s:%s@%s:%s" % (rpc_user, rpc_password, rpc_host, rpc_port),
        timeout=120)
    last_block = (rpc_connection.getblockchaininfo())["blocks"]
    last_ten_blocks = []
    for i in range(last_block-9, last_block+1):
        block_hash = rpc_connection.getblockhash(i)
        block = rpc_connection.getblock(block_hash)
        last_ten_blocks.append(block)
    last_ten_blocks.reverse()
    return JsonResponse(last_ten_blocks, safe=False)


def get_block(request, block_height):
    rpc_connection = AuthServiceProxy(
        "http://%s:%s@%s:%s" % (rpc_user, rpc_password, rpc_host, rpc_port),
        timeout=120)
    block_hash = rpc_connection.getblockhash(block_height)
    block = rpc_connection.getblock(block_hash)
    block.update(rpc_connection.getblockstats(block_hash))
    cnt = 0
    block_transactions = []
    for tx in block["tx"]:
        transaction = [
            tx, (rpc_connection.getrawtransaction(tx, True))["txid"]]
        block_transactions.append(transaction)
        cnt += 1
    block["tx"] = block_transactions

    return JsonResponse(block, safe=False)


def get_transaction(request, transaction_id):
    rpc_connection = AuthServiceProxy(
        "http://%s:%s@%s:%s" % (rpc_user, rpc_password, rpc_host, rpc_port),
        timeout=120)
    transaction = rpc_connection.getrawtransaction(transaction_id, True)
    if "blockhash" in transaction.keys():
        transaction["block"] = (rpc_connection.getblock(
            transaction["blockhash"]))["height"]
    tx_inputs = transaction["vin"]
    tx_outputs = transaction["vout"]
    total_input = 0
    total_output = 0
    cnt = 0
    for output in tx_outputs:
        total_output += output["value"]
    if "coinbase" not in tx_inputs[0].keys():
        for input in tx_inputs:
            output_number = input["vout"]
            tx = rpc_connection.getrawtransaction(input["txid"], True)
            output = tx["vout"][output_number]
            tx_inputs[cnt].update(output)
            total_input += input["value"]
            cnt += 1

        transaction["vin"] = tx_inputs
        transaction["fee"] = total_input - total_output
        transaction["total_input"] = total_input
    else:
        transaction["fee"] = 0
        transaction["total_input"] = 0
    transaction["total_output"] = total_output

    if("confirmations" in transaction.keys()):
        transaction["status"] = "Confirmed"
    else:
        transaction["status"] = "Not confirmed"
    exchange_rates = (requests.get(
        "https://blockchain.info/ticker", params={"cors": True})).json()
    transaction["value_in_eur"] = float(
        total_output) * exchange_rates["EUR"]["last"]
    transaction["value_in_usd"] = float(
        total_output) * exchange_rates["USD"]["last"]
    return JsonResponse(transaction, safe=False)


def get_mempool(request):
    rpc_connection = AuthServiceProxy(
        "http://%s:%s@%s:%s" % (rpc_user, rpc_password, rpc_host, rpc_port),
        timeout=120)
    mempool = rpc_connection.getrawmempool(True)
    transactions_in_mempool = []
    for tx_id in mempool:
        transaction = rpc_connection.getrawtransaction(tx_id, True)
        transaction.update({"time": mempool[tx_id]["time"]})
        transactions_in_mempool.append(transaction)
    transactions_in_mempool.reverse()
    return JsonResponse(transactions_in_mempool, safe=False)
