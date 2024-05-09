pipeline {
    agent any

    triggers {
        issueCommentTrigger('.*test this please.*')
    }
    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
    }
}
