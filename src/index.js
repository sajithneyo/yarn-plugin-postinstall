const chalk = require('chalk');
const { exec } = require('child_process');

async function sh(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}

module.exports = {
    name: `custom-postinstall`,
    factory: (require) => {
        return {
            default: {
                hooks: {
                    async afterAllInstalled(project) {
                        const { stdout } = await sh('yarn postinstall');
                        console.log(chalk.green(stdout));
                    },
                },
            },
        };
    },
};
