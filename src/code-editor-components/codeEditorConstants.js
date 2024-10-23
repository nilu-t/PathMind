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

export const files = {
    // Popular Programming Languages
    "python": {
        name: "script.py",
        defaultLanguage: "python",
        value: `#${getRandomSaying()}`
    },
    "javascript": {
        name: "vanilla_script.js",
        defaultLanguage: "javascript",
        value: `//${getRandomSaying()}`
    },
    "java": {
        name: "script.java",
        defaultLanguage: "java",
        value: `//${getRandomSaying()}`
    },
    "c++": {
        name: "cpp_script.cpp",
        defaultLanguage: "cpp",
        value: `//${getRandomSaying()}`
    },
    "c": {
        name: "script.c",
        defaultLanguage: "c",
        value: `//${getRandomSaying()}`
    },
    "c sharp": {
        name: "script.cs",
        defaultLanguage: "csharp",
        value: `//${getRandomSaying()}`
    },
    "go": {
        name: "go_script.go",
        defaultLanguage: "go",
        value: `//${getRandomSaying()}`
    },
    "ruby": {
        name: "ruby_script.rb",
        defaultLanguage: "ruby",
        value: `#${getRandomSaying()}`
    },
    "kotlin": {
        name: "script.kt",
        defaultLanguage: "kotlin",
        value: `//${getRandomSaying()}`
    },
    "rust": {
        name: "script.rs",
        defaultLanguage: "rust",
        value: `//${getRandomSaying()}`
    },
    "swift": {
        name: "script.swift",
        defaultLanguage: "swift",
        value: `//${getRandomSaying()}`
    },
    "dart": {
        name: "script.dart",
        defaultLanguage: "dart",
        value: `//${getRandomSaying()}`
    },
    "typescript": {
        name: "script.ts",
        defaultLanguage: "typescript",
        value: `//${getRandomSaying()}`
    },

    // Assembly Languages
    "nasm": {
        name: "nasm_script.asm",
        defaultLanguage: "nasm",
        value: `;${getRandomSaying()}`
    },
    "nasm64": {
        name: "nasm64_script.asm",
        defaultLanguage: "nasm64",
        value: `;${getRandomSaying()}`
    },
    "llvm_ir": {
        name: "llvm_script.ll",
        defaultLanguage: "llvm_ir",
        value: `;${getRandomSaying()}`
    },

    // Object-Oriented Languages
    "scala": {
        name: "script.scala",
        defaultLanguage: "scala",
        value: `//${getRandomSaying()}`
    },
    "crystal": {
        name: "script.cr",
        defaultLanguage: "crystal",
        value: `#${getRandomSaying()}`
    },
    "smalltalk": {
        name: "script.st",
        defaultLanguage: "smalltalk",
        value: `"${getRandomSaying()}"`
    },
    "groovy": {
        name: "script.groovy",
        defaultLanguage: "groovy",
        value: `//${getRandomSaying()}`
    },
    "julia": {
        name: "script.jl",
        defaultLanguage: "julia",
        value: `#${getRandomSaying()}`
    },
    "pascal": {
        name: "script.pas",
        defaultLanguage: "pascal",
        value: `//${getRandomSaying()}`
    },
    "freebasic": {
        name: "script.bas",
        defaultLanguage: "freebasic",
        value: `'${getRandomSaying()}`
    },

    // Functional Languages
    "haskell": {
        name: "script.hs",
        defaultLanguage: "haskell",
        value: `--${getRandomSaying()}`
    },
    "elixir": {
        name: "script.ex",
        defaultLanguage: "elixir",
        value: `#${getRandomSaying()}`
    },
    "erlang": {
        name: "script.erl",
        defaultLanguage: "erlang",
        value: `%%${getRandomSaying()}`
    },
    "ocaml": {
        name: "script.ml",
        defaultLanguage: "ocaml",
        value: `(* ${getRandomSaying()} *)`
    },

    // Scripting Languages
    "bash": {
        name: "script.sh",
        defaultLanguage: "bash",
        value: `#${getRandomSaying()}`
    },
    "powershell": {
        name: "script.ps1",
        defaultLanguage: "powershell",
        value: `#${getRandomSaying()}`
    },
    "lua": {
        name: "script.lua",
        defaultLanguage: "lua",
        value: `--${getRandomSaying()}`
    },
    "php": {
        name: "script.php",
        defaultLanguage: "php",
        value: `//${getRandomSaying()}`
    },
    "perl": {
        name: "script.pl",
        defaultLanguage: "perl",
        value: `#${getRandomSaying()}`
    },

    // Data Science and Statistical Languages
    "rscript": {
        name: "script.R",
        defaultLanguage: "rscript",
        value: `#${getRandomSaying()}`
    },
    "octave": {
        name: "script.m",
        defaultLanguage: "octave",
        value: `%${getRandomSaying()}`
    },
    "sqlite3": {
        name: "script.sql",
        defaultLanguage: "sqlite3",
        value: `--${getRandomSaying()}`
    },

    // Esoteric Languages
    "brainfuck": {
        name: "script.bf",
        defaultLanguage: "brainfuck",
        value: `//${getRandomSaying()}`
    },
    "cow": {
        name: "script.cow",
        defaultLanguage: "cow",
        value: `//${getRandomSaying()}`
    },
    "rockstar": {
        name: "script.rock",
        defaultLanguage: "rockstar",
        value: `//${getRandomSaying()}`
    },
    "befunge93": {
        name: "script.bef",
        defaultLanguage: "befunge93",
        value: `;${getRandomSaying()}`
    },
    "japt": {
        name: "script.japt",
        defaultLanguage: "japt",
        value: `//${getRandomSaying()}`
    },
    "emojicode": {
        name: "script.emojic",
        defaultLanguage: "emojicode",
        value: `🍇${getRandomSaying()}`
    },
    "lolcode": {
        name: "script.lol",
        defaultLanguage: "lolcode",
        value: `BTW ${getRandomSaying()}`
    },
    "jelly": {
        name: "script.jelly",
        defaultLanguage: "jelly",
        value: `#${getRandomSaying()}`
    },
    "pyth": {
        name: "script.pyth",
        defaultLanguage: "pyth",
        value: `#${getRandomSaying()}`
    },

    // Code-Golf Languages
    "golfscript": {
        name: "script.gs",
        defaultLanguage: "golfscript",
        value: `#${getRandomSaying()}`
    },
    "bqn": {
        name: "script.bqn",
        defaultLanguage: "bqn",
        value: `#${getRandomSaying()}`
    },
    "cjam": {
        name: "script.cjam",
        defaultLanguage: "cjam",
        value: `//${getRandomSaying()}`
    },
    "paradoc": {
        name: "script.pd",
        defaultLanguage: "paradoc",
        value: `#${getRandomSaying()}`
    },
    "brachylog": {
        name: "script.brachylog",
        defaultLanguage: "brachylog",
        value: `%${getRandomSaying()}`
    },
    "matl": {
        name: "script.matl",
        defaultLanguage: "matl",
        value: `%${getRandomSaying()}`
    },

    // Procedural Languages
    "cobol": {
        name: "script.cbl",
        defaultLanguage: "cobol",
        value: `* ${getRandomSaying()}`
    },
    "forth": {
        name: "script.fth",
        defaultLanguage: "forth",
        value: `\\ ${getRandomSaying()}`
    },
    "fortran": {
        name: "script.f90",
        defaultLanguage: "fortran",
        value: `!${getRandomSaying()}`
    },

    // Logical and Constraint Programming Languages
    "prolog": {
        name: "script.pl",
        defaultLanguage: "prolog",
        value: `%${getRandomSaying()}`
    },
    "raku": {
        name: "script.raku",
        defaultLanguage: "raku",
        value: `#${getRandomSaying()}`
    },

    // Hardware Description Languages
    "iverilog": {
        name: "script.v",
        defaultLanguage: "iverilog",
        value: `//${getRandomSaying()}`
    },

    // Miscellaneous or Novel Languages
    "osabie": {
        name: "script.osb",
        defaultLanguage: "osabie",
        value: `//${getRandomSaying()}`
    },
    "zig": {
        name: "script.zig",
        defaultLanguage: "zig",
        value: `//${getRandomSaying()}`
    },
    "samarium": {
        name: "script.sam",
        defaultLanguage: "samarium",
        value: `#${getRandomSaying()}`
    },

    // Dash (Command-Line Scripting Language)
    "dash": {
        name: "script.dash",
        defaultLanguage: "dash",
        value: `#${getRandomSaying()}`
    },

    // Additional Languages
    "forte": {
        name: "script.frt",
        defaultLanguage: "forte",
        value: `//${getRandomSaying()}`
    },
    "dragon": {
        name: "script.drg",
        defaultLanguage: "dragon",
        value: `//${getRandomSaying()}`
    },
    "yeethon": {
        name: "script.yt",
        defaultLanguage: "yeethon",
        value: `#${getRandomSaying()}`
    },
    "vyxal": {
        name: "script.vyxal",
        defaultLanguage: "vyxal",
        value: `#${getRandomSaying()}`
    },
    "pure": {
        name: "script.pure",
        defaultLanguage: "pure",
        value: `//${getRandomSaying()}`
    },
    "clojure": {
        name: "script.clj",
        defaultLanguage: "clojure",
        value: `;${getRandomSaying()}`
    },
    "racket": {
        name: "script.rkt",
        defaultLanguage: "racket",
        value: `;${getRandomSaying()}`
    },
    "lisp": {
        name: "script.lisp",
        defaultLanguage: "lisp",
        value: `;${getRandomSaying()}`
    },
    "coffeescript": {
        name: "script.coffee",
        defaultLanguage: "coffeescript",
        value: `#${getRandomSaying()}`
    },
    "file": {
        name: "script.file",
        defaultLanguage: "file",
        value: `#${getRandomSaying()}`
    },
    "emacs": {
    name: "script.el",
    defaultLanguage: "emacs",
    value: `;;${getRandomSaying()}`
}
};
