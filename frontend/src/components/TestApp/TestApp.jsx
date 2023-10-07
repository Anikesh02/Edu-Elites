import React, { useState } from 'react';
import { getFirestore, setDoc, doc, getDoc, collection, addDoc, updateDoc } from 'firebase/firestore';
import { useUser } from '../../UserContext.jsx';
import { db , updateCollection} from '../../firebase.js';
import { Link } from 'react-router-dom';
// import card from '../../assets/images/card.png'
import pie from '../../assets/images/pie.png'


const QuizComponent = () => {

  const { user, updateUser } = useUser();

  const quizQuestions = [
    "When you're trying to understand a complex concept, do you find that you:",
    "What type of educational content engages you the most?",
    "How do you remember directions to a new place?",
    "When you're learning a new language, what helps you the most?",
    "How do you prefer to study for an upcoming exam?",
    "When you listen to a song for the first time, what do you pay the most attention to?",
    "How do you prefer to take notes during a lecture?",
    "When you want to learn about a new topic, what do you do first?",
    "How do you prefer to express your thoughts and ideas?",
  ];

  const quizAnswers = [
    ["A. Prefer diagrams, charts, or visual aids.", "B. Enjoy listening to explanations.", "C. Tend to read written materials like textbooks.", "D. Don't have a strong preference."],
    ["A. Educational videos and animations.", "B. Podcasts or audio lectures.", "C. Reading articles and written explanations.", "D. It varies depending on the subject."],
    ["A. By looking at a map.", "B. By listening to someone's verbal instructions.", "C. By reading written directions.", "D. I use a combination of methods."],
    ["A. Hearing native speakers and conversations.", "B. Reading written language materials.", "C. Watching videos with subtitles.", "D. It doesn't matter; I'm not interested in learning languages."],
    ["A. Explaining concepts out loud or discussing them with others.", "B. Reading and summarizing notes.", "C. Watching videos or tutorials.", "D. I adapt my study methods based on the subject."],
    ["A. Lyrics and the singer's voice.", "B. The melody and rhythm.", "C. The song's written description or reviews.", "D. I rarely listen to music."],
    ["A. Writing detailed notes in a notebook.", "B. Making bulleted lists or diagrams.", "C. Recording the lecture to review later.", "D. I don't take notes during lectures."],
    ["A. Search for articles, books, or written resources.", "B. Watch videos or documentaries about the topic.", "C. Ask someone to explain it to me.", "D. It depends on the topic and my mood."],
    ["A. Through writing, such as essays or blog posts.", "B. Through verbal communication, like discussions or presentations.", "C. Through visual elements like diagrams or charts.", "D. I adapt my communication style based on the situation."],
  ];

  const [numResponses, setNumResponses] = useState(0);

  const [learningStyles, setLearningStyles] = useState({
    Visual: 0,
    Auditory: 0,
    'Reading/Writing': 0,
  });

  const handleResponse = (response, index) => {
    const updatedLearningStyles = { ...learningStyles };

    if (response === "1") {
      updatedLearningStyles["Visual"] += 1;
      setNumResponses(numResponses + 1);
    } else if (response === "2") {
      updatedLearningStyles["Auditory"] += 1;
      setNumResponses(numResponses + 1);

    } else if (response === "3") {
      updatedLearningStyles["Reading/Writing"] += 1;
      setNumResponses(numResponses + 1);
    }

    setLearningStyles(updatedLearningStyles);
  };

  const dominantStyle = Object.keys(learningStyles).reduce(
    (a, b) => (learningStyles[a] > learningStyles[b] ? a : b),
    null
  );

  const saveAnswers = () => {
    const answersObject = {};

    console.log(user?.uid);

    if (!user || !user.uid) {
        console.error("User or user ID is null or undefined.");
        return; // Stop execution if user or user ID is not available
    }

    const docRef = doc(db, "users", user.uid);

    updateDoc(docRef, { learningStyle: dominantStyle });

    quizQuestions.forEach((question, index) => {
        answersObject[question] = quizAnswers[index][learningStyles[dominantStyle] - 1];
    });

    console.log(answersObject);
};


  const DominantLearnStyle = () => {
    if (numResponses === 9) {
      return (
        <div className="mt-4">
          <p className="font-bold text-lg">Your dominant learning style is {dominantStyle}!</p>
          <Link to='/personal'><button onClick={saveAnswers} className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg">
            Save Answers</button></Link>
        </div>
      );
    }
  }

  return (
    <div className='container'>
      
      <h1 className='heading text-center mt-5'>Let's check your intereset</h1>
    <div className="w-full items-center justify-center mx-[10px] p-8 bg-{card} rounded-lg shadow-lg">
      <div className='flex gap-[30px] justify-end'>
        {/* <img src={pie} alt="" className='w-[450px] h-[450px] mb-3 ml-[150px] mr-5' /> */}
        </div>
    
      {quizQuestions.map((question, index) => (
        <div key={index} className="mb-9">
          <p className="font-bold text-lg mb-4">{question}</p>
          {quizAnswers[index].map((answer, answerIndex) => (
            <div key={answerIndex} className="mb-2">
              <label className="flex items-center">
                <span className="mr-2">{answerIndex + 1}. {answer}</span>
                <input
                  type="radio"
                  name={`question${index}`}
                  value={answerIndex + 1}
                  onChange={(e) => handleResponse(e.target.value, index)}
                  className="form-radio"
                />
              </label>
            </div>
          ))}
        </div>
      ))}
      <DominantLearnStyle />
    </div>
    </div>
  );
};

export default QuizComponent;
