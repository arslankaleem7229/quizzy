pipeline {
    agent any
    environment {
        APP_NAME = 'quizzy'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Create Env File') {
            steps {
                withCredentials([file(credentialsId: 'env-file', variable: 'ENV_FILE')]) {
                    sh '''
                rm -f .env.docker
                cp $ENV_FILE .env.docker
                chmod 644 .env.docker
            
                    '''
                }
            }
        }
        
        stage('Stop Old Containers') {
            steps {
                sh 'docker-compose down || true'
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }
        
        stage('Cleanup') {
            steps {
                sh '''
                    docker image prune -f
                '''
            }
        }
    }
    
    post {
        failure {
            echo 'Deployment failed!'
        }
        success {
            echo 'Deployment successful!'
        }
    }
}