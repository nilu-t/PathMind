const sayings = [
    "Write some clean code here!",
    "Write some neat code here!",
    "Let's get those functions flowing!",
    "Draft your next big idea here!",
    "Build something cool right here!",
    "Time to make the code shine!",
    "Put your logic to the test!",
    "Sketch out some solid code!",
    "Get those algorithms in motion!"
];  

const getRandomSaying = () =>{
    let randomIndex = Math.floor(Math.random() * sayings.length); //random index, Math.random() generates a number between 0 to 1, we multiply that by length of the array and floor the value for the random index.

    return sayings[randomIndex];
}

export const files = { //an object of objects. i.e, file[file_name] => returns file name, default language, default value => that we can pass to the editor
    "html":{
        name: "index.html",
        defaultLanguage: "html",
        value: `<h1>${getRandomSaying()}</h1>`
    },
    "css":{
        name: "app.css",
        defaultLanguage: "css",
        value: `/* ${getRandomSaying()} */`
    },
    "go":{
        name: "go_script.go",
        defaultLanguage: "go",
        value: `//${getRandomSaying()}`
    },
    "ruby":{
        name: "ruby_script.rb",
        defaultLanguage: "ruby",
        value: `//${getRandomSaying()}`
    },
    "ruby on rails":{
        name: "ruby_on_rails_script.rb",
        defaultLanguage: "ruby",
        value: `//${getRandomSaying()}`
    },
    "javascript":{
        name: "vanilla_script.js",
        defaultLanguage: "javascript",
        value: `//${getRandomSaying()}`
    },
    "react":{
        name: "react_component.js",
        defaultLanguage: "javascript",
        value: `//${getRandomSaying()}`
    },
    "node.js":{
        name: "node_script.js",
        defaultLanguage: "javascript",
        value: `//${getRandomSaying()}`
    },
    "vue":{
        name: "vue_script.js",
        defaultLanguage: "javascript",
        value: `//${getRandomSaying()}`
    },
    "java":{
        name: "script.kt",
        defaultLanguage: "kotlin",
        value: `//${getRandomSaying()}`
    },
    "kotlin":{
        name: "script.java",
        defaultLanguage: "java",
        value: `//${getRandomSaying()}`
    },
    "rust":{
        name: "script.rs",
        defaultLanguage: "rust",
        value: `//${getRandomSaying()}`
    },
    "python":{
        name: "script.py",
        defaultLanguage: "python",
        value: `#${getRandomSaying()}`
    }, 
    "django":{
        name: "django_script.py",
        defaultLanguage: "python",
        value: `#${getRandomSaying()}`
    }, 
    "tensorflow":{
        name: "tensorflow_script.py",
        defaultLanguage: "python",
        value: `#${getRandomSaying()}`
    }, 
    "scikit-learn":{
        name: "scikit_learn_script.py",
        defaultLanguage: "python",
        value: `#${getRandomSaying()}`
    }, 
    "c++":{
        name: "cpp_script.cpp",
        defaultLanguage: "cpp",
        value: `//${getRandomSaying()}`
    }, 
    "c sharp":{
        name: "script.cs",
        defaultLanguage: "csharp",
        value: `//${getRandomSaying()}`
    }, 
    "unity":{
        name: "unity_script.cs",
        defaultLanguage: "csharp",
        value: `//${getRandomSaying()}`
    }, 
    "r":{
        name: "script.R",
        defaultLanguage: "R",
        value: `#${getRandomSaying()}`
    }, 
    "aws":{
        name: "aws_python_script.py",
        defaultLanguage: "python",
        value: `#${getRandomSaying()}`
    }, 
    "google cloud":{
        name: "gc_python_script.py",
        defaultLanguage: "python",
        value: `#${getRandomSaying()}`
    }, 

}