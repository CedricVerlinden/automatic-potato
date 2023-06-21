#!/usr/bin/env ts-node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import figlet from "figlet";
import gradient from "gradient-string";
import { createSpinner } from "nanospinner";

let playerName: string;

const sleep = (msg = 2000) => new Promise((resolve) => setTimeout(resolve, msg));

async function welcome() {
    const title = chalkAnimation.rainbow("Welcome to the CLI\n");
  
    await sleep();
    title.stop();
  
    console.log(`
      ${chalk.bgCyan("HOW TO USE")}
      I am a process on your computer.
      If you get any question wrong I will be ${chalk.red("killed")}.
      So get all the questions right.
    `);
}

async function askName() {
    const answers = await inquirer.prompt({
      name: "player_name",
      type: "input",
      message: "What is your name?",
      default() {
        return "Player";
      },
    });
  
    playerName = answers.player_name;
  }
  
  async function question1() {
    const answers = await inquirer.prompt({
      name: "question_1",
      type: "list",
      message: "JavaScript was created in 10 days then released on\n",
      choices: [
        "May 23rd, 1995",
        "Nov 24th, 1995",
        "Dec 4th, 1995",
        "Dec 17th, 1995",
      ],
    });
  
    return handleAnswer(answers.question_1 === "Dec 4th, 1995");
  }
  
  async function handleAnswer(isCorrect: boolean) {
    const spinner = createSpinner("Checking answer...").start();
    await sleep();
  
    if (isCorrect) {
      spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
    } else {
      spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
      process.exit(1);
    }
  }
  
  function winner() {
    console.clear();
    const msg = `Congrats, ${playerName}!\n$ 1 , 0 0 0 , 0 0 0`;
  
    figlet(msg, (err, data) => {
        if (!err) {
            console.log(gradient.pastel.multiline(data));
        }
    });
  }

  await welcome();
  await askName();
  await question1();
  winner();
