import csLearningPaths from './csLearningPaths.json';

import { Link } from 'react-router-dom'

const MyPath = () => {

    const myLearningPaths = csLearningPaths.learningPaths;

    const convertToImageNamePNG = (subject) =>{
        return `${subject.toLowerCase().replaceAll("+","plus").replace("#","-sharp").replace(".","").replaceAll(" ", "-")}-logo.png`
    }

    const handleFileUpload = (title, event) => {
        const file = event.target.files[0];
        console.log(`File uploaded for ${title}: ${file.name}`);
        //handling the uploaded file. i.e, extract the text and upload the note to the database. 

    };

    return(
        <div id="my-path-div">
            { myLearningPaths.map( (pathObj, index) => {
                const subjectsArr = pathObj.subjects;

                const images = subjectsArr.map((subject) =>{
                    const imagePath = `learning-path-images/computer-science/${convertToImageNamePNG(subject)}`; //from the public folder so the path can be accessed from there. 

                    let subjectRoute = `/NotesList/${subject}`

                    if(subject === "C#"){
                        //special case when the subject is c#.
                        subjectRoute = `/NotesList/C Sharp`
                    }

                    return (
                        <Link to= { subjectRoute }>
                            <img src={imagePath} alt={imagePath} draggable={false}/>
                        </Link>
                    );
                })

                return(
                <div className="path-card" key={index}>
                    <h1 id="path-title"> { pathObj.title } </h1>
                    <p id="path-desc">{ pathObj.description }</p>

                    <div id="path-images">
                        { images }
                    </div>
                </div>
                );

            })}
        </div>
    );
}

export default MyPath;
