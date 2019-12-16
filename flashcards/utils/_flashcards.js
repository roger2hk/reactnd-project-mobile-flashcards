import { AsyncStorage } from "react-native";

export const FLASHCARDS_STORAGE_KEY = "Flashcards:decksStorage";

function setDummyData() {
  const dummyData = {
    React: {
      title: "Deck Title 1",
      questions: [
        {
          question: "Question 1?",
          answer: "Answer 1"
        },
        {
          question: "Question 2?",
          answer: "Answer 2"
        }
      ]
    },
    JavaScript: {
      title: "Deck Title 2",
      questions: [
        {
          question: "Question 1?",
          answer: "Answer 1"
        }
      ]
    }
  };

  AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(dummyData));

  return dummyData;
}

export function formatResults(results) {
  return results === null ? setDummyData() : JSON.parse(results);
}
