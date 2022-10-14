function Stack({player}){
    return <div>{player.stack}</div>
}

function StackBB({player}){
    return <div>{(player.stack/bb).toFixed(2)} BB</div>
}

function StackDiv({player}){
    return <div><Stack player={player}/><StackBB player={player}/></div>
}

function Position({player}){
    return <div className="badge bg-primary pos-bg">{player.position}</div>
}

function Name({player}){
    return <span>  {player.name}</span>
}

function Odds({player}){
    return <div>Odds: {player.odds}/1</div>
}

function ReqEq({player}){
    return <div>Req: {(1/(1+player.odds)).toFixed(2)}</div>
}

function OddsDiv({player}){
    return <div><Odds player={player}/><ReqEq player={player}/></div>
}

function Equity({player}){
    return <div>Eq: {player.equity.toPrecision(2)}</div>
}

function EquityDiv({player}){
    return <div>
        <div><OddsDiv player={player}/><Equity player={player}/></div>
    </div>
}

function Cards({player}){
    if (player.combo=="None"){
        return <div>
            <Card card="_back"/><Card card="_back"/>
            <div><ActionButton option="Show Range"/></div>
        </div>
    }else{
        let card1 = player.combo.slice(0,2)
        let card2 = player.combo.slice(2)
        return <div><Card card={card1}/><Card card={card2}/></div>
    }
    
}

function CardsDiv({player}){
    if (player.folded){
        return <Folded/>
    }
    return <Cards player={player}/>
}

function Card({card}){
    return <img src={"lib/flaticons/cards2/"+card+".png"} className="pkCard"/>
}

function Folded(){
    return <div>
        <img src={"lib/flaticons/_out.png"} className="out-icon"/>
    </div>
}


function ActionButton({option}){
    return <button className="btn btn-secondary">{option}</button>
}

function ActionBar({options}){
    return <div className="btn-group" role="group" aria-label="Basic example">
        <ActionButton option={options[0]}/>
        <ActionButton option={options[1]}/>
        <ActionButton option={options[2]}/>
    </div>
}

function PlayBar({player}){
    if (player.active){
        let options = []
        if (player.toCall == 0){
            options =  ["Fold", "Check", "Bet"]
        } else {
            options = ["Fold", "Call", "Raise"]
        }return <ActionBar options={options}/>
    }return <p></p>
    
    
    
}
function ActivePlayer({player}){
    return <tr className="table-primary">
        <td><Position player={player}/><Name player={player}/></td>
        <td><StackDiv player={player}/></td>
        <td><Cards player={player}/></td>
        <td><EquityDiv player={player}/></td>
        <td><PlayBar player={player}/></td>
    </tr>
}

function UsualPlayer({player}){
    return <tr>
        <td><Position player={player}/><Name player={player}/></td>
        <td><StackDiv player={player}/></td>
        <td><CardsDiv player={player}/></td>
        <td><EquityDiv player={player}/></td>
        <td><PlayBar player={player}/></td>
    </tr>
}

function Player({player}){
    if (player.active){
        return <ActivePlayer player={player}/>
    }else{
        return <UsualPlayer player={player}/>
    }
}

function RenderPlayers(players){
    let playersTable = players.map(player=>
        <Player player={player} key={player.name}/>
    )
    ReactDOM.render(playersTable, document.querySelector("#tablePlayers"))
}

export {RenderPlayers, Player}