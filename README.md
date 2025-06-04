# Dragon Quest Battle React

This project intend to train an intern to use React fundamentals

![Screenshot 2025-06-04 at 14 43 46](https://github.com/user-attachments/assets/f1f7e3cb-ea86-4143-abae-d08f79c7ff4b)

## Setup

Install the dependencies:

```bash
npm install
```

## Get started

Start the dev server:

```bash
npm dev
```

## Instructions

The goal of the project is to create a Dragon Quest battle simulator where you can encounter monsters.

The monsters assets can be found here -> https://www.spriters-resource.com/pc_computer/dragonquestiiihd2dremake/

This project will require to learn about [React's context and hooks](https://react.dev/reference/react/useContext) in order to maintain a global state accross all components.

### Requirements:

Clicking on "Start fight" should display a battle popup with:

1. A random amount (1 to 4) of monsters on the top and theirs stats (HP, MP). There could be 4 different monsters with fixed statistics
2. A list of actions on the bottom:
    - Attack (inflicts a random number of damage to the selected monster)
    - Magic (2 or 3 spells that inflicts a random number of damage to one or multiple monsters and withdraw PM from the hero)
    - BONUS: Tactics (inflicts some random damage to the selected monster or steal their MP, higher chance to miss)
    - Flee (Should go back to the world map)
3. Each actions should be describe in a dialog (example: `Monster A attacks hero and inflicts 4 of damage` or `Monster B is dead`)
4. If the MP of the hero aren't sufficient to use magic it should display an error message
5. When all monsters are defeated it should display victory then go back to the world map
6. When the hero is defeated it should display a game over.

You can decide to implement either a fixed turn by turn loop (first the hero then all monsters) and later decide to randomize it or dependending on some agility stats if you have time.

No need to add animations.

### Bonuses:

1. You could implement a system of dynamic HP, MP, attack, defense and agility for the monsters.
2. You could implement a system of experience that increments after each victories.


### Plan before coding

Using the tool of your choice (canvas)
