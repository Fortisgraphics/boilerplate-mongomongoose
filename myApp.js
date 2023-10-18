const mongoose = require("mongoose");
require("dotenv").config();

// 1) Install and Set Up Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

/* 2) Create a "Person" Model */
// CRUD Part1 - Create
// create a schema for your database Model which is very important
const { Schema } = mongoose;

const personSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: Number,
    favoriteFoods: [String],
  },
  {
    timestamp: true,
  },
);

/* 3) create and Save a person */
const Person = mongoose.model("Person", personSchema);

/* 4) Create and Save a Record of a Model */
const createAndSavePerson = (done) => {
  const Jacky = new Person({
    name: "Jacky Ate",
    age: 21,
    favoriteFoods: ["eggs and plantain", "fish", "rice and beans"],
  });
  Jacky.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

/* 5) Create Many Records with models.create() */

const arrayOfPeople = [
  {
    name: "Yan",
    age: 19,
    favoriteFoods: ["rice & beans"],
  },
  {
    name: "John Deo",
    age: 26,
    favoriteFoods: ["rice & beans"],
  },
  {
    name: "Nadia",
    age: 24,
    favoriteFoods: ["Fried rice and meats"],
  },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, people) => {
    if (error) return console.error(error);
    done(null, people);
  });
};

/* 6) Use model.find() to Search Your Database*/

const findPeopleByName = (personName, done) => {
  Person.find({}, (err, personName) => {
    if (err) return console.error(err);
    done(null, personName);
  });
};

/* 7) Use model.findOne() to Return a Single matching Document form Your Database */

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

/* 8) Use model.findById() to Search Your Database by _id */

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

/* Perform Classic Updates by Running Find, Edit, then Save */

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // .findById() method to find a person by _id with the parameter personId as search key.

  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods

    const { favoriteFoods } = person;
    favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.

    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(err, updatedPerson);
    });
  });
};

// Perform New Updates on a Document Using model.findOneAndUpdate()

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  // findAndUpdate has 3 parameter condition, update, option, callback
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatePersonDoc) => {
      if (err) return console.log(err);
      done(null, updatePersonDoc);
    },
  );
};

// Delete One Document Using model.findByIdAndRemove
// You should use one of the methods findByIdAndRemove() or findOneAndRemove()

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person) => {
    if (err) return console.log(err);
    done(null, person);
  });
};

// Delete Many Documents with model.remove()
// is useful to delete all the documents matching given criteria, donsn't return the delete doc but the a json object with it outcome

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, currentPeople) => {
    if (err) return console.log(err);
    done(null, currentPeople);
  });
};

// Chain Search Query Helpers to Narrow Search Results

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 }) // To sort an array, // Here: 1 for ascending	order and -1 for descending order.
    .limit(2) //To limit an array’s size: return array which has 5 items in it.
    .select({ age: 0 }) //To hide certain property from the result: Here: 0 means false and thus hide name property; 1 means true so age property will show.
    
    //To execute this query
    .exec((err, people) => {
      if (err) return console.log(err);
      done(null, people);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
