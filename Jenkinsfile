pipeline {
    agent none

    stages {
        stage('SonarQube Analysis') {
            agent {
                kubernetes {
                    inheritFrom 'sonarqube'
                }
            }
            steps {
                container('sonarqube') {
                    sh 'pwd'
                    sh 'ls'

                }
            }
        }
    }
}