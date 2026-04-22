pipeline {
    agent any

    environment {
        IMAGE = "kuber19/node-demo"
        TAG = "${BUILD_NUMBER}"
        DOCKERHUB_CREDS = "655ded39-f4ab-4c38-ae7c-07261a366b3a"
    }

    stages {

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
