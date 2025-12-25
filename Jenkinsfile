pipeline {
    agent any
    
    environment {
        APP_NAME = 'Quizzy'
        DOCKER_IMAGE = "${APP_NAME}:${BUILD_NUMBER}"
        
        GOOGLE_CLIENT_ID = credentials('GOOGLE_CLIENT_ID')
        GOOGLE_CLIENT_SECRET = credentials('GOOGLE_CLIENT_SECRET')
        FACEBOOK_CLIENT_ID = credentials('FACEBOOK_CLIENT_ID')
        FACEBOOK_CLIENT_SECRET = credentials('FACEBOOK_CLIENT_SECRET')
        DATABASE_URL = credentials('DATABASE_URL')
        SHADOW_DATABASE_URL = credentials('SHADOW_DATABASE_URL')
        DEEPSEEK_API_KEY = credentials('DEEPSEEK_API_KEY')
        NEXTAUTH_SECRET = credentials('NEXTAUTH_SECRET')
        S3_ACCESS_KEY_ID = credentials('S3_ACCESS_KEY_ID')
        S3_SECRET_ACCESS_KEY = credentials('S3_SECRET_ACCESS_KEY')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh """
                    docker build \
                        --build-arg NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL} \
                        -t ${DOCKER_IMAGE} .
                """
            }
        }
        
        stage('Stop Old Containers') {
            steps {
                sh '''
                    docker-compose down || true
                '''
            }
        }
        
        stage('Deploy') {
            steps {
                sh """
                    docker-compose up -d --build
                """
            }
        }
        
        stage('Cleanup') {
            steps {
                sh 'docker image prune -f'
            }
        }
    }
    
    post {
        failure {
            echo 'Deployment failed!'
        }
        success {
            echo 'Deployment successful! App running at ${APP_URL}'
        }
    }
}