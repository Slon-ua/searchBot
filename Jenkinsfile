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
                // sh 'ls -la ~'                
                // sh 'ls -la ~/jobs/'
                // sh 'ls -la ~/jobs/Search_KIA/builds/${BUILD_NUMBER}/'
                sh 'ls -la ~/jobs/Search_KIA/builds/210/archive/'
                sh 'ls -la /var/jenkins_home/jobs/Search_KIA/builds/210/archive/'
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
