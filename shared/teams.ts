import Player from "player";


export var teamColours = [
    0xffffff, //white - neutral
    0x2679ff, //blue
    0xfc271b, //red
    0x21cc0e, //green
    0xf9e900, //yellow
]

export function getSmallestTeam(players: Player[]) {
    let count = new Array<number>(teamColours.length).fill(0);
    for (let player of players) {
        count[player.team]++;
    }
    let minTeam = 1;
    let minCount = Number.MAX_VALUE;
    for (let i = 1; i < teamColours.length; i++) {
        if (count[i] < minCount) {
            minTeam = i;
            minCount = count[i];
        }
    }
    return minTeam;
}