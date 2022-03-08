class Ninja {
    constructor(name, speed=3, strength=3) {
        this.name = name
        this.health = 100
        this.speed = speed
        this.strength = strength
    }

    sayName() {
        console.log("My name is " + this.name)
    }

    showStats() {
        console.log("*************Stats************")
        console.log("Name: " + this.name)
        console.log("Strength: " + this.strength);
        console.log("Speed: " + this.speed);
        console.log("Health: " + this.health);
        console.log("*****************************");
    }

    drinkSake() {
        this.health += 10
    }
}

class Sensei extends Ninja {
    constructor(name, strength=10, speed=10) {
        super(name,speed,strength)
        this.health = 200
        this.wisdom = 10
    }

    speakWisdom() {
        super.drinkSake()
        console.log("What one programmer can do in one month, two programmers can do in two months.")
    }
}

const ninja1 = new Ninja("Hyabusa");
ninja1.sayName();
ninja1.showStats();
ninja1.drinkSake()
ninja1.showStats()

// example output
const superSensei = new Sensei("Master Splinter");
superSensei.speakWisdom();
// -> "What one programmer can do in one month, two programmers can do in two months."
superSensei.showStats();
// -> "Name: Master Splinter, Health: 210, Speed: 10, Strength: 10"
