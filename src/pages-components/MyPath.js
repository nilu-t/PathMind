import csLearningPaths from './csLearningPaths.json'

const MyPath = () => {

    // const learningPathToFind = "Cybersecurity";
    // const path = csLearningPaths.learningPaths.find( (lPath) => lPath.title === learningPathToFind);


    const myLearningPaths = csLearningPaths.learningPaths;

    return(
        <div id="my-path-div">
            { myLearningPaths.map( (pathObj) => 
                <div className="path-card">
                    <h1> { pathObj.title } </h1>
                </div>
            ) }
        </div>
    )
}

export default MyPath;