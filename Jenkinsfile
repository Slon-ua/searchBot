pipeline {
    post {
        always {
            archiveArtifacts artifacts: '*.json, KIA__Niro, KIA__Niro2'
        }
        
    }
    agent any
    // agent {
    //     node {
    //         label 'main'
    //     }
    // }
    stages {
        stage('Preparation') {
            //agent none
            steps {
                // cleanWs()
                // dir("./") {
                //     git branch: 'main', url: 'git@github.com:driveroo/ClockworkLogs.git', credentialsId: 'Jenkins-GitHub-SSH-Key'
                // }

                sh 'pwd'
                sh 'ls -la'
                sh 'ls -la ~'                
                sh 'ls -la ~/jobs/'
                sh 'ls -la ~/jobs/Search KIA/'
                sh 'ls -la ~/logs/'
                // sh 'ls -la ../'
                // sh 'ls -la ../../'
                // sh 'ls -la ../../../'
                // sh 'ls -la ../../../../'
                // sh 'ls -la ../../../../../'
                sh 'ls -la /187/execution/node/3/ws/KIA__Niro2/'
                sh 'pwd'
                sh 'npm install'
                sh 'npm i node-telegram-bot-api'
                sh 'npm install --save cross-fetch'
            }
        }
        stage('Run script'){
            steps {                      
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'node search_KIA.js ${BUILD_NUMBER}'                
                }
            }
        }
    }
}
