from flask import Flask, redirect, url_for
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware as CORS
from fastapi.responses import JSONResponse, Response
from pkrcomponents.table import Table
from pkrcomponents.tournament import Tournament, Level
from pkrcomponents.table_player import TablePlayer
import json
import numpy as np

class Game(Flask):

    def __init__(self):
        Flask.__init__(self, __name__)
        self.table = Table()
        level = Level(4, 400)
        tournament = Tournament(level = level)
        self.table.add_tournament(tournament)
        players = [
            TablePlayer(name=f"Toto", seat=1, stack=2000),
            TablePlayer(name=f"Tata", seat=2, stack=2500),
            TablePlayer(name=f"Titi", seat=6, stack=25000),
            TablePlayer(name=f"Tete", seat=4, stack=120327),
            TablePlayer(name=f"Tutu", seat=5, stack=267),
            TablePlayer(name=f"Tonton", seat=3, stack=11500)
        ]
        for pl in players:
            pl.sit(self.table)
        self.table.bb = 2
        self.table.players.distribute_positions()
        self.table.post_pregame()
        self.table.current_player.call()
        self.table.ordered = [self.table.players.seat_dict[seat] for seat in self.table.players.preflop_ordered_seats]
        self.table.current_player.bet(850)
        self.table.draw_flop("As", "Ad", "Ah")

    @property
    def table_info(self):
        return {
            "level": self.table.tournament.level.level,
            "bb": self.table.tournament.level.bb,
            "board": [f"{card}" for card in self.table.board],
            "max_players": self.table.max_players, 
            "pot": self.table.pot.value, 
            "players": [
                {
                    "name": player.name,
                    "stack": player.stack,
                    "position": f"{player.position}",
                    "combo": f"{player.combo}",
                    "odds": "{:.1f}".format(player.pot_odds),
                    "equity": "{:.3f}".format(1/5),
                    "req": "{:.3f}".format(player.req_equity),
                    "toCall": player.to_call,
                    "active": player == self.table.current_player,
                    "folded": player.folded,
                    "call EV": "{:.2f}".format((player.to_call+self.table.pot.value)*0.2-player.to_call*0.8)
                } 
                for player in self.table.ordered
            ]
        }

    def change_max(self, max):
        self.table.max_players = int(max)




game = Game()

@game.route("/")
def root():
    return game.table_info

@game.route("/table/max_players/<max>")
def change_max(max):
    game.change_max(max)
    return redirect(url_for('root'))

@game.route("/start")
def start_game():
    pass

@game.route("/add_player/", methods=["POST"])
def add_player():
    pass

@game.route("/board")
def board():
    return game.table_info["board"]