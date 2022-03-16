const express = require("express")
const { faker } = require('@faker-js/faker')

const app = express()
const port = 8000

class User {
    constructor() {
        this._id = faker.datatype.number()
        this.firstName = faker.name.firstName()
        this.lastName = faker.name.lastName()
        this.phoneNumber = faker.phone.phoneNumber()
        this.email = faker.internet.email()
        this.password = faker.internet.password()
    }
}

class Company {
    constructor() {
        this._id = faker.datatype.number()
        this.name = faker.company.companyName()
        this.address = {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zipCode: faker.address.zipCode(),
            country: faker.address.country()
        }
    }
}

// respond with a new user generated with Faker API
app.get("/api/users/new", (req, res) => {
    res.json(new User())
})

// respond with a new company generated with Faker API
app.get("/api/companies/new", (req, res) => {
    res.json(new Company())
})

// respond with an object, containing a new user and a new company generated with Faker API
app.get("/api/user/company", (req, res) => {
    res.json({ user: new User(), company: new Company() })
})


app.listen(port, () => console.log(`Listening on port: ${port}`));