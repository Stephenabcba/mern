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
        console.log("*****************************")
        console.log("Name: " + this.name)
        console.log("Strength: " + this.strength);
        console.log("Speed: " + this.speed);
        console.log("Health: " + this.health);
    }

    drinkSake() {
        this.health += 10
    }
}

const ninja1 = new Ninja("Hyabusa");
ninja1.sayName();
ninja1.showStats();
ninja1.drinkSake()
ninja1.showStats()