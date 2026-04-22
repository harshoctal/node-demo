pipeline {
    agent any

    environment {
        IMAGE = "kuber19/node-demo"
        TAG = "${BUILD_NUMBER}"
        DOCKERHUB_CREDS = "dockerhub-creds"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/harshoctal/node-demo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE:$TAG ."
                sh "docker tag $IMAGE:$TAG $IMAGE:latest"
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: DOCKERHUB_CREDS,
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                }
            }
        }

        stage('Push Image') {
            steps {
                sh "docker push $IMAGE:$TAG"
                sh "docker push $IMAGE:latest"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh "kubectl set image deployment/node-app node-app=$IMAGE:$TAG"
            }
        }
    }
}
