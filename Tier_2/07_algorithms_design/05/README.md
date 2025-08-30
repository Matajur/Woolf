# Tier 2. Module 7 - Design and Analysis of Algorithms

## Lesson 05. Homework - Big data algorithms

### Task 1 - Checking the uniqueness of passwords using the Bloom filter

#### Task description

Create a function to check the uniqueness of passwords using a Bloom filter. This function should determine whether a password has been used before, without having to store the passwords themselves.

#### Specifications

1. Implement a `BloomFilter` class that provides the ability to add elements to a filter and check for the presence of an element in the filter.
2. Implement a `check_password_uniqueness` function that uses an instance of `BloomFilter` and checks the list of new passwords for uniqueness. It should return the result of the check for each password.
3. Ensure that all data types are handled correctly. Passwords should be treated simply as strings, without hashing. Empty or invalid values ​​should also be considered and handled appropriately.
4. The function and class should work with large data sets, using minimal memory.

#### Acceptance Criteria

1. The `BloomFilter` class implements the logic for working with a Bloom filter.
2. The `check_password_uniqueness` function checks new passwords using the passed filter.
3. The code executes the use case according to the expected results.

#### Use case

```Python
if __name__ == "__main__":
    # Bloom filter initialization
    bloom = BloomFilter(size=1000, num_hashes=3)

    # Adding existing passwords
    existing_passwords = ["password123", "admin123", "qwerty123"]
    for password in existing_passwords:
        bloom.add(password)

    # Checking new passwords
    new_passwords_to_check = ["password123", "newpassword", "admin123", "guest"]
    results = check_password_uniqueness(bloom, new_passwords_to_check)

    # Output of results
    for password, status in results.items():
        print(f"Password '{password}' - {status}.")
```

Result

```
Password 'password123' is already used.
Password 'newpassword' is unique.
Password 'admin123' is already used.
Password 'guest' is unique.
```

### Task 2 - HyperLogLog performance comparison with accurate unique element counting

#### Task description

Create a script to compare the exact count of unique elements and the count using HyperLogLog.

#### Specifications

1. Load a dataset from a real log file [lms-stage-access.log](https://drive.google.com/file/d/13NUCSG7l_z2B7gYuQubYIpIjJTnwOAOb/view) containing information about IP addresses.
2. Implement a method for the exact count of unique IP addresses using the `set` structure.
3. Implement a method for the approximate count of unique IP addresses using HyperLogLog.
4. Compare the methods in terms of execution time.

#### Acceptance criteria

1. The data loading method processes the log file, ignoring incorrect rows.
2. The exact count function returns the correct number of unique IP addresses.
3. HyperLogLog displays the result with an acceptable error.
4. The comparison results are presented in a table.
5. The code is adapted to large data sets.

#### Example of output

```
Comparison results:
                       Accurate counting   HyperLogLog
Unique elements                 100000.0      99652.0
Execution time (sec.)               0.45          0.1
```
