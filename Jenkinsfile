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
    parameters {
        string(name: 'BUILD', defaultValue: '${BUILD_NUMBER}', description: 'Short description what is going to be changed')
        string(name: 'BUILD2', defaultValue: '${BUILD_NUMBER}-1', description: 'Short description what is going to be changed')
        
    }
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
                // sh 'ls -la ~/jobs/Search_KIA/builds/'
                // sh 'ls -la ~/jobs/Search_KIA/builds/${BUILD_NUMBER}/'
                
                // sh 'ls -la ~/jobs/Search_KIA/builds/'+BUILD_NUMBER-1+'/'
                
                // sh 'ls -la ~/jobs/Search_KIA/builds/'+$BUILD_NUMBER-1+'/'
                // sh 'ls -la ~/logs/'
                sh 'echo "#${BUILD}"'                
                sh 'echo "#${BUILD2}"'
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
