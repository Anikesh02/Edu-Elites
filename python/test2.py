import numpy as np

# Define initial parameters for multiple skills (questions in the quiz)
num_questions = 3  # Number of quiz questions
P_L0 = [0.4] # Prior probability of knowing each question
P_T = [0.3]   # Probability of transitioning from not learned to learned for each question
P_G = [0.2] # Probability of guessing correctly for each question
P_S = [0.1]   # Probability of slipping for each question

# Define the quiz questions and correct answers
quiz_questions = [
    {
        'question': 'What is the capital of France?',
        'options': ['London', 'Berlin', 'Paris', 'Madrid'],
        'correct_answer': 'Paris'
    },
    {
        'question': 'Which programming language is known for its readability?',
        'options': ['Python', 'Java', 'C++', 'JavaScript'],
        'correct_answer': 'Python'
    },
    {
        'question': 'How many planets are there in our solar system?',
        'options': ['7', '8', '9', '10'],
        'correct_answer': '8'
    }
]

# Simulated user responses to the quiz (1 for correct, 0 for incorrect)
# Each element corresponds to the user's response to a quiz question
user_responses = []

# Display the quiz questions and collect user responses
print("Welcome to the Python Quiz!")

for i, question in enumerate(quiz_questions, start=1):
    print(f"\nQuestion {i}: {question['question']}")
    for j, option in enumerate(question['options'], start=1):
        print(f"{j}. {option}")
    user_answer = input("Enter the number of your answer (1, 2, 3, or 4): ")
    if user_answer.isnumeric() and 1 <= int(user_answer) <= 4:
        user_responses.append(1 if question['options'][int(user_answer)-1] == question['correct_answer'] else 0)
    else:
        print("Invalid input. Please enter a valid option (1, 2, 3, or 4).")

# Initialize the knowledge states for all questions
knowledge_states = [P_L0[0] for i in range(num_questions)]

# Update the knowledge states based on user responses
for i, response in enumerate(user_responses):
    # Calculate the posterior probabilities using Bayes' theorem
    P_L1 = (P_T[0] * knowledge_states[i]) / ((P_T[0] * knowledge_states[i]) + ((1 - P_S[0]) * (1 - knowledge_states[i])))
    P_L0 = ((1 - P_T[0]) * knowledge_states[i]) / (((1 - P_T[0]) * knowledge_states[i]) + (P_S[0] * (1 - knowledge_states[i])))
        
    # Update the knowledge state for the current question
    knowledge_states[i] = P_L1 if response == 1 else P_L0

# Print the final knowledge states for all questions
for i in range(num_questions):
    print(f"Question {i + 1} Knowledge State:", knowledge_states[i])

# Make adaptive learning decisions based on knowledge states
for i in range(num_questions):
    if knowledge_states[i] <= 0.2:
        print(f"You have mastered Question {i + 1}")
    elif knowledge_states[i] >= 0.8:
        print(f"You need more practice with Question {i + 1}")
    else:
        print(f"You are making progress with Question {i + 1}")
        
