import axios from "axios";
import { useState, useEffect } from "react";

const sendGetRequest = async (route_name) => {
    try {
        const response = await axios.get(route_name);
        console.log(`response from get request is ${JSON.stringify(response.data, null, 2)}`);
        return response.data;
    } catch (error) {
        console.log(`error from get request is ${error}`);
    }
};

const Activity = () => {
    const [totalNotes, setTotalNotes] = useState(0);

    const mostUsedLearningPath = 'temp';
    const mostUsedSubject = 'temp';
    const numNotesShared = -1;

    useEffect(() => {
        const fetchTotalNotes = async () => {
            const data = await sendGetRequest('http://localhost:8000/get_total_notes');
            setTotalNotes(data.totalNotes || 0);  // Assuming "COUNT(id)" is the key in the response object
        };

        fetchTotalNotes();
    }, []);

    return (
        <div id="activity-div">
            <h1>Activity Page</h1>
            <p>Some cool things for this Activity page are being planned...stay tuned! In the meantime, you can visit your "My Path" for all your learning needs.</p>
            <h3>Total Notes: {totalNotes}</h3> 
            <h3>Most used Learning Path: {mostUsedLearningPath} </h3>
            <h3>Most used Subject: {mostUsedSubject} </h3>
            <h3>Number of Notes shared: {numNotesShared}</h3>
        </div>
    );
}

export default Activity;
