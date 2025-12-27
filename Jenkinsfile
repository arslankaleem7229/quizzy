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
                        rm -f .env.production
                        cp $ENV_FILE .env.production
                        chmod 644 .env.production
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
                sh 'docker-compose -f docker-compose.prod.yml up -d --build'
            }
        }
        
        stage('Cleanup') {
            steps {
                sh '''
                    rm -f .env.docker
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