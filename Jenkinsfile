pipeline {
    post {
        always {
            archiveArtifacts artifacts: '*.json'
        }
        
    }
    agent {
        node {
            label 'master'
        }
    }
    stages {
        stage('Preparation') {
            agent none
            steps {
                // cleanWs()
                // dir("./") {
                //     git branch: 'main', url: 'git@github.com:driveroo/ClockworkLogs.git', credentialsId: 'Jenkins-GitHub-SSH-Key'
                // }
                sh 'ls -la'
                sh 'pwd'
                sh 'npm install'
                sh 'npm i node-telegram-bot-api'
                sh 'npm install --save cross-fetch'
            }
        }
        stage('Run Clockwork Log script'){
            steps {   
                sh 'node search_KIA.js'
            }
        }
    }
}