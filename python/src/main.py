import json
import os
import sys
import time

from telethon import TelegramClient, events, utils
from agent import Agent


def print_text(name, text):
    print(name + " said: " + text)


def register(cb, the_chat_id):
    # `pattern` is a regex, see https://docs.python.org/3/library/re.html
    # Use https://regexone.com/ if you want a more interactive way of learning.
    #
    # "(?i)" makes it case-insensitive, and | separates "options".
    @client.on(events.NewMessage(chats=the_chat_id, forwards=True))
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
config_file = open('../../config/agent_config.json', encoding='UTF8')

agent_config = json.load(config_file)

session = agent_config["session"]
api_id = agent_config["api_id"]
api_hash = agent_config["api_hash"]
the_chat_id = agent_config["chat_id"]

proxy = None  # https://github.com/Anorov/PySocks

client = TelegramClient(session, api_id, api_hash, proxy=proxy).start()

register(print_text, the_chat_id)

run()
