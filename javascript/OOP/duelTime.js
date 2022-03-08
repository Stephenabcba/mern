class Card {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
}

class Unit extends Card {
    constructor(name, cost, power, res) {
        super(name,cost);
        this.power = power;
        this.res = res;
    }

    attack(target) {
        target.res -= this.power;
    }

    printStats() {
        console.log(`${this.name} has cost of ${this.cost}, power of ${this.power}, and resilience of ${this.res}`)
    }
}

class Effect extends Card {
    constructor(name, cost, text, stat, magitude) {
        super(name, cost);
        this.text = text;
        this.stat = stat;
        this.magitude = magitude;
    }

    play (target) {
        if (target instanceof Unit) {
            if (this.stat == "resilience") {
                target.res += this.magitude;
            } else if (this.stat == "power") {
                target.power += this.magitude;
            }
        } else {
            throw new Error("Target must be a unit!");
        }
    }
}

let redBeltNinja = new Unit("Red Belt Ninja", 3, 3, 4);
let hardAlgo = new Effect("hard Algorithm", 2, "increase target's resilience by 3", "resilience", 3);
hardAlgo.play(redBeltNinja);
let blackBeltNinja = new Unit("Black Belt Ninja", 4, 5, 4);
let uPRejection = new Effect("Unhandled Promise Rejection", 1, "reduce target's resilience by 2", "resilience", -2);
uPRejection.play(redBeltNinja);
let pairProgramming = new Effect("Pair Programming", 3, "increase target's power by 2", "power", 2);
pairProgramming.play(redBeltNinja);
redBeltNinja.attack(blackBeltNinja)
redBeltNinja.printStats()
blackBeltNinja.printStats()