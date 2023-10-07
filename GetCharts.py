import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')
import numpy as np
from io import BytesIO
import base64
import os
from datetime import datetime


def course_progression(course_data):
    num_courses = len(course_data)
    num_cols = 4  # Number of columns per row
    num_rows = (num_courses - 1) // num_cols + 1  # Calculate the number of rows needed

    fig, axs = plt.subplots(num_rows, num_cols, figsize=(num_cols * 5, num_rows * 5))

    for i, (course, progress) in enumerate(course_data.items()):
        row = i // num_cols
        col = i % num_cols

        labels = ['Remaining', 'Progress']
        sizes = [100 - progress, progress]
        colors = ['#D3D3D3', '#99c47a']

        axs = np.atleast_2d(axs)  # Ensure axs is a 2-dimensional array
        axs[row, col].pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=90,
                          wedgeprops=dict(width=0.4, edgecolor='w'))
        axs[row, col].set_title(course)
        axs[row, col].axis('equal')

    # Flatten the axs array if there are fewer subplots than courses
    axs = axs.flatten()
    
    # Turn off the remaining subplots
    for i in range(len(course_data), num_rows * num_cols):
        axs[i].axis('off')

    img_path = "course_progress_chart.png"
    plt.savefig(img_path)
    plt.close()

    return img_path


def marks_progression(marks_data):
    # Convert date strings to datetime objects for proper sorting
    dates = [datetime.strptime(date, "%Y-%m-%d") for date in marks_data.keys()]
    marks = list(marks_data.values())

    plt.figure(figsize=(10, 6))
    plt.plot(dates, marks, marker='o', linestyle='-')
    
    # Add padding to the y-axis limits
    plt.ylim(min(marks) - 5, max(marks) + 5)

    plt.title("Student's Marks Progression Over Time")
    plt.xlabel("Date")
    plt.ylabel("Marks")
    plt.grid(True)
    
    img_path = "marks_progression_chart.png"
    plt.savefig(img_path)
    plt.close()
    return img_path


if __name__ == "__main__":
    # Example usage:
    student_progress = {
        "course1": 75,
        "course2": 12,
        "course3": 10,
        "course4": 80,
        # Add more courses and progress data as needed
    }

    student_marks = {
    "2023-01-01": 90,
    "2023-02-01": 80,
    "2023-03-01": 85,
    "2023-04-01": 78,
    # Add more dates and marks as needed
    }

    # marks_progression(student_marks)

    course_progression(student_progress)
