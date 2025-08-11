pipeline {
    agent any
    environment {
        IMAGE_NAME = 'node-express-app'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/OP-CODER/node-express-app.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                bat "docker build -t ${IMAGE_NAME} ."
            }
        }
        stage('Test') {
            steps {
                bat """
                docker run --rm -v "C:/Users/mohda/.jenkins/workspace/node-express-app:/usr/src/app" -w /usr/src/app ${IMAGE_NAME} npm test
                """
            }
        }
        stage('Deploy') {
            steps {
                bat """
                docker stop ${IMAGE_NAME} || exit 0
                docker rm ${IMAGE_NAME} || exit 0
                docker run -d --name ${IMAGE_NAME} -p 3000:3000 ${IMAGE_NAME}
                """
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials',
                                                      usernameVariable: 'DOCKER_USER',
                                                      passwordVariable: 'DOCKER_PASS')]) {
                        bat """
                        docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                        docker tag ${IMAGE_NAME} %DOCKER_USER%/${IMAGE_NAME}:latest
                        docker push %DOCKER_USER%/${IMAGE_NAME}:latest
                        docker logout
                        """
                    }
                }
            }
        }
    }
}
