#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>
#include <stdexcept>
#include <cmath>
using namespace std;
// Function to perform the "helper" logic
int helper(vector<string>& arr, int maxIter) {
    int i = 0;
    while (i < maxIter) {
        vector<string> newArr;

        for (int ind = 0; ind < arr.size(); ind++) {
            try {
                string item = arr[ind];
                
                if (item == "0") {
                    newArr.push_back("1");
                } else if (item.length() % 2 == 0) {
                    newArr.push_back(item.substr(0, item.length() / 2));
                    // Simulate BigUint64Array (a large number handling)
                    int num = stoull(item.substr(item.length() / 2));
                    newArr.push_back(to_string(num));
                } else {
                    // Multiplying by 2024 (using large number simulation)
                    int num = stoull(item) * 2024;
                    newArr.push_back(to_string(num));
                }
            } catch (const invalid_argument& e) {
                // Handle error
                if (string(e.what()) == "stoi") {
                    return 0;
                    // vector<std::string> firstPart(arr.begin(), arr.begin() + ind);
                    // return helper(vector<string>(arr.begin(), arr.begin() + ind), maxIter - i) + helper(vector<string>(arr.begin() + ind, arr.end()), maxIter - i);
                }
                cerr << e.what() << endl;
            }
        }

        arr = newArr;
        ++i;
    }

    return arr.size();
}

int main() {
    ifstream file("day11.txt");

    if (!file.is_open()) {
        cerr << "Error reading file: day11.txt" << endl;
        return 1;
    }

    stringstream buffer;
    buffer << file.rdbuf();
    string data = buffer.str();
    file.close();

    vector<string> arr;
    stringstream ss(data);
    string temp;

    while (ss >> temp) {
        arr.push_back(temp);
    }

    // Perform the helper function
    cout << helper(arr, 75) << endl;

    return 0;
}
