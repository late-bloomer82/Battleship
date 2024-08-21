# Battleship

Battleship, the game.

1. Use JS methods instead of using traditional loops when possible for conveniency and better time complexity.

2. Mocking should be used sparingly. Mostly for functions that produce side effects(modifying global state, making network requests, or interacting with the file system, apis and databases, slow and complex operations etc..)

3. Object-Oriented Programming (OOP)

4. JS compares arrays by reference(memory location) not by content

5. Commit more often. I'm being too lazy with it

6. I need to read the official docs more often.

7. Generally, for responsive and accessible web applications, it's better to use relative units.

8. I familiarize myself with using css classes and pseudoclasses and manipulating classes using js. Its really useful for manipulating the same elements but in when they are in a different state, by adding css classes etc.

9. Omg, i need to really get better applying the Single Responsibility Principle (SRP). My functions are too crowded and are not modularized enough. Too much clutter and makes reusability very difficult. Gotta get better at separating DOM manipulation from JS logic and functionality.

10. Writing readable and maintainable code is crucial. Refactoring is very important.

11. Tbh, I'm not feeling Test first development. Development Driven Test Development(DDT) is more intuitive.

12. Just realized I could of just initalized the game array coordinates with a position property that has the respective position percentages considering the 10 by 10 grid size. Would of simplified the gameboard object and other tasks...

13. You can have functions inside of functions. I already knew this but, yeah.

14. I used Recursion myself(index.js)! Calling the function inside of itself can sometimes be very useful(in this case i couldnt use a while loop with set timeout because of the single-threaded nature of javascript)

15. Ternary operator is very useful! condition ? value_if_true : value_if_false;

16. The transform: translate(-50%, -50%); CSS property is used to precisely center an absolutely positioned element within its parent element. This is necessary because absolute positioning (top: 50%; left: 50%;) sets the top-left corner of the child element to the center of the parent, not the center of the child itself. The transform property adjusts the position by moving the element up and to the left by 50% of its own width and height, thereby centering it correctly.The transform: translate(-50%, -50%); is crucial for centering an absolutely positioned element both horizontally and vertically.

17. Need to familiarize myself with JS manipulation of classList.add() and classList.remove(). Can be very helpful to add pre-existing classes to style certain elements or remove them.

18. It is better practice to use classes and separate css styling from js when dynamically manipulating the dom. Didn't do this too well for this project as I made this realization later on in my project.

19. Using console.logs to visualize objects and data structures has helped me tremendously throughout the project.

20. so in arrow function, you dont need parenthese for 1 argument, but you need parentheses for no arguments, and you also need parenthese for more than 1 arguments correct?

21. Damn, promises are amazing for asynchronous operations.

22. Gotta get better at using flag variables for state management.

23. Instead of creating ids to so many elements for styling, I can just take advantage of css selectors to select these elements!

24. Do while loop and sets! While loops are effective for random number generation operations.

25. Now that im at the end of the project, im finding myself spending a lot of time fixing mistakes and bugs that I made earlier in the project, which happens, but I think this time I wasn't focused at some periods earlier in the project and its costing me a lot of time...

26. I should of used grid!

27. Loops for simplifying and refactoring!

28. The aspect-ratio property in CSS is used to ensure that an element maintains a specific ratio between its width and height. Can be useful for responsive design.

29. Yea switching to grid from flexbox for the gameboard grid fixed my y-axis ships misalignment issue, shoulda used grid from the start.
