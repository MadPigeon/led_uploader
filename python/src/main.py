import json
import time

from telethon import TelegramClient, events, utils
from agent import Agent


def print_text(file_name):

    print(file_name + " was saved.")


def register(cb, the_chat_id, folder):
    # `pattern` is a regex, see https://docs.python.org/3/library/re.html
    # Use https://regexone.com/ if you want a more interactive way of learning.
    #
    # "(?i)" makes it case-insensitive, and | separates "options".
    @client.on(events.NewMessage(chats=the_chat_id, forwards=True))
    async def handler(event):
        message = event.message
        new_name = folder + '/' + format(int(round(time.time())), 'd')
        await message.download_media(new_name)

        sender = await event.get_sender()
        name = utils.get_display_name(sender)
        cb(new_name)


def run():
    try:
        print('(Press Ctrl+C to stop this)')
        client.run_until_disconnected()
    finally:
        client.disconnect()


test = Agent()
config_file_agent = open('../../config/agent_config.json', encoding='UTF8')

agent_config = json.load(config_file_agent)

session = agent_config["session"]
api_id = agent_config["api_id"]
api_hash = agent_config["api_hash"]
the_chat_id = agent_config["chat_id"]

config_file_app = open('../../config/app_config.json', encoding='UTF8')
app_config = json.load(config_file_app)
folder = app_config["folder"]

proxy = None  # https://github.com/Anorov/PySocks

client = TelegramClient(session, api_id, api_hash, proxy=proxy).start()

register(print_text, the_chat_id, folder)

run()
