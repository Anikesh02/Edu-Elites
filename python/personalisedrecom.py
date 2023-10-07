import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# Sample dataset (replace this with your actual dataset)
data = {
    'course_id': [1, 2, 3, 4, 5],
    'title': ['Introduction to Web development(auditory)', 'Figma design tutorial(visual)', 'Machine Learning Workshop(theory)', 'Advanced data visualization Concepts(visual)', 'Communication Strategies(auditory)'],
    'description': ['Course on web development techniques.', 'Learn the basics of figma design.', 'Theory and basics of machine learning.', 'Advanced data visual concepts and techniques.', 'Strategies for effective communication.'],
    'learning_type': ['auditory', 'visual', 'written', 'visual', 'auditory'],
}

courses_df = pd.DataFrame(data)

# TF-IDF Vectorizer for text data
tfidf_vectorizer = TfidfVectorizer(stop_words='english')

# Fit and transform the course descriptions
tfidf_matrix = tfidf_vectorizer.fit_transform(courses_df['description'])

# Function to get personalized recommendations for a given learning type
def get_personalized_recommendations(learning_type, courses_df, tfidf_matrix):
    # Filter courses by learning type
    learning_type_courses = courses_df[courses_df['learning_type'] != learning_type]

    # Calculate cosine similarity between courses
    cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)

    # Get indices of courses similar to the ones the user has already taken
    course_indices = learning_type_courses.index

    # Calculate average similarity score for each course
    avg_similarity_scores = cosine_similarities[course_indices].mean(axis=0)

    # Sort courses by average similarity score in descending order
    sorted_courses = pd.Series(avg_similarity_scores, index=courses_df.index).sort_values(ascending=False)

    # Exclude courses the user has already taken
    unrated_courses = sorted_courses[~sorted_courses.index.isin(course_indices)]

    return unrated_courses.index

# Example: Get recommendations for a visual learner
learning_type = input("what is the learning type:")
recommendations = get_personalized_recommendations(learning_type, courses_df, tfidf_matrix)

print(f"Personalized recommendations for {learning_type} learner: {courses_df['title'].iloc[recommendations].tolist()}")
