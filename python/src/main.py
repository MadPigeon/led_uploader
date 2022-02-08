import json
import os
import sys
import time

from telethon import TelegramClient, events, utils
from agent import Agent


def print_text(name, text):
    print(name + " said: " + text)


def register(cb):
    # `pattern` is a regex, see https://docs.python.org/3/library/re.html
    # Use https://regexone.com/ if you want a more interactive way of learning.
    #
    # "(?i)" makes it case-insensitive, and | separates "options".
    @client.on(events.NewMessage(pattern=r'(?i).*\b(hello|hi)\b'))
    async def handler(event):
        sender = await event.get_sender()
        name = utils.get_display_name(sender)
        cb(name, event.text)


def run():
    try:
        print('(Press Ctrl+C to stop this)')
        client.run_until_disconnected()
    finally:
        client.disconnect()


test = Agent()
f = open('../../config/app_config.json', encoding='UTF8')

data = json.load(f)

session = data["TG_SESSION"]
api_id = data["TG_API_ID"]
api_hash = data["TG_API_HASH"]

proxy = None  # https://github.com/Anorov/PySocks

client = TelegramClient(session, api_id, api_hash, proxy=proxy).start()

register(print_text)

run()
