#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'Who wants to be a JavaScript Millionaire?'
  );

	await sleep();
	rainbowTitle.stop();

	console.log(`
		${chalk.bgBlue('HOW TO PLAY')}
		I am a process on your computer.
		If you get any question wrong I will be ${chalk.bgRed('killed')}
		So get all the questions right...

	`);
}

async function askName() {
	const answers = await inquirer.prompt({
		name: 'player_name',
		type: 'input',
		message: 'What is your name?',
		default() {
			return 'Player';
		},
	});

	playerName = answers.player_name

}

async function question1() {
	const answers = await inquirer.prompt({
		name: 'question_1',
		type: 'list',
		message: 'JavaScript was created in 10 days and then release on: \n',
		choices: [
			'May 23rd, 1995',
			'Nov 24th, 1995',
			'Dec 4th, 1995',
			'Dec 17, 1996',
		],
	});

	return handleAnswer(answers.question_1 == 'Dec 4th, 1995');
}

async function question2() {
	const answers = await inquirer.prompt ({
		name: 'question_2',
		type: 'list',
		message: 'What was the first web browser with a graphical user interface?',
		choices: [
			'Internet Explorer',
			'Netscape',
			'Lynx',
			'Mosaic'
		],
	});

	return handleAnswer(answers.question_2 == 'Mosaic');
}

async function question3() {
	const answers = await inquirer.prompt ({
		name: 'question_3',
		type: 'list',
		message: 'What year was JScript released in conjunction with initial support for HTML and CSS?',
		choices: [
			'1994',
			'1995',
			'1996',
			'1997'
		],
	});

	return handleAnswer(answers.question_3 == '1995');
}

async function question4(){
	const answers = await inquirer.prompt ({
		name: 'question_4',
		type: 'list',
		message: 'What entity owns the JavaScript trademark?',
		choices: [
			'Microsoft',
			'Google',
			'Oracle',
			'IBM'
		],
	});

	return handleAnswer(answers.question_4 == 'Oracle');
}

async function question5() {
	const answers = await inquirer.prompt ({
		name: 'question_5',
		type: 'list',
		message: 'What percent of websites use JavaScript as their client-side scripting language? (circa 2022)',
		choices: [
			'98%',
			'97%',
			'96%',
			'99%'
		],
	});

	return handleAnswer(answers.question_5 == '98%');
}

async function handleAnswer(isCorrect) {
	const spinner = createSpinner('Checking answer...').start();
	await sleep();

	if (isCorrect) {
		spinner.success({ text: `Nice work, ${playerName}.`});
	} else {
		spinner.error({ text: `Game over, you lose ${playerName}!`});
		process.exit(1);
	}
}

function winner() {
	console.clear();
	const msg = `Congrats, ${playerName} ! \n $ 1 , 0 0 0 , 0 0 0`;

	figlet(msg, (err, data) => {
		console.log(gradient.pastel.multiline(data));
	});
}


await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await winner();