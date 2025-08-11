pipeline {
    agent any
    environment {
        IMAGE_NAME = 'node-express-app'
    }
    stages {
        stage('Checkout') {
            steps {
                // Checkout from GitHub repo, change branch and URL as needed
                git branch: 'main', url: 'https://github.com/OP-CODER/node-express-app.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                // Build Docker image with the specified tag
                bat "docker build -t ${IMAGE_NAME} ."
            }
        }
        stage('Test') {
            steps {
                // Run tests inside the Docker container using the built image
                bat "docker run --rm node-express-app npm test"
            }
        }
        stage('Deploy') {
            steps {
                // Stop and remove any existing container, then run new container detached on port 3000
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
                    // Use Jenkins credentials for Docker Hub login
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
    post {
        always {
            // Cleanup dangling images to free space after build
            bat 'docker image prune -f'
        }
    }
}
