import csLearningPaths from './csLearningPaths.json';

import { Link } from 'react-router-dom'

const MyPath = () => {

    const myLearningPaths = csLearningPaths.learningPaths;

    const convertToImageNamePNG = (subject) =>{
        return `${subject.toLowerCase().replaceAll("+","plus").replace("#","-sharp").replace(".","").replaceAll(" ", "-")}-logo.png`
    }

    return(
        <div id="my-path-div">
            { myLearningPaths.map( (pathObj, index) => {
                const subjectsArr = pathObj.subjects;

                //function to map over the learning path subjects. For each subject we create its associated link to the notes list and corresponding image.
                const images = subjectsArr.map((subject, i) =>{
                    const imagePath = `learning-path-images/computer-science/${convertToImageNamePNG(subject)}`; //from the public folder so the path can be accessed from there. 

                    let subjectRoute = `/NotesList/${subject}`

                    if(subject === "C#"){
                        //special case when the subject is c#.
                        subjectRoute = `/NotesList/C Sharp`
                    }

                    return (
                        <Link to= { subjectRoute } key={i}>
                            <img src={imagePath} alt={imagePath} draggable={false}/>
                        </Link>
                    );
                })

                //for each learning path a 'path card' is rendered. 
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
