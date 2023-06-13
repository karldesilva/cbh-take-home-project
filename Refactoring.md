# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

During refactoring, I have separated the formatting and encrypting parts of the function so that it is clear when reviewing the code, what these code blocks were intended to do. This also helped to reduce the amount of if else conditions which gives more visibility on all the path ways code can be executed. As an added bonus this also reduced unnecessarily executing the formatting code block as well.

Creating a separate function for the encryption has removed the code duplication. Other than these changes I have also renamed the constant variables to shorter and more simpler names that still explains their purpose clearly.

Combining all these traits I have introduced has made the code more readable than the original version.
