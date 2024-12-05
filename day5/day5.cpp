#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <map>

using namespace std;

vector<string> splitString(const string &input, const string &delimiter)
{
    vector<string> result;
    size_t start = 0;
    size_t end;

    while ((end = input.find(delimiter, start)) != string::npos)
    {
        result.push_back(input.substr(start, end - start)); // Extract substring
        start = end + delimiter.length();                   // Move past the delimiter
    }

    // Add the last substring after the final delimiter
    result.push_back(input.substr(start));

    return result;
}

int main()
{
    ifstream file("day5-rules.txt"); // Open the file
    if (!file)
    {
        cerr << "Error: File could not be opened!" << endl;
        return 1;
    }

    stringstream buffer;
    buffer << file.rdbuf(); // Read the entire file into the buffer
    string rulesStr = buffer.str();
    vector<string> rules = splitString(rulesStr, "\n");
    map<int, map<int, int>> m;
    for (int i = 0; i < rules.size(); i++)
    {
        vector<string> num = splitString(rules[i], "|");
        m[stoi(num[0])][stoi(num[1])] = 1;
    }
    cout<<m.size()<<endl;
    for (auto i : m)
    {
        cout << i.first << "->";
        for (auto j : i.second)
        {
            cout << j.first << " ";
        }
        cout << endl;
    }
    file.close(); // Close the file

    ifstream file2("day5-orders.txt"); // Open the file
    if (!file2)
    {
        cerr << "Error: File could not be opened!" << endl;
        return 1;
    }

    stringstream buffer2;
    buffer2 << file2.rdbuf(); // Read the entire file into the buffer
    string orderStr = buffer2.str();
    vector<string> orders = splitString(orderStr, "\n");
    int ans = 0;
    for (int i = 0; i < orders.size(); i++)
    {
        vector<string> pagesStr = splitString(orders[i], ",");
        vector<int> pages;
        for (int j = 0; j < pagesStr.size(); j++)
        {
            pages.push_back(stoi(pagesStr[j]));
        }
        bool valid = true;
        for (int j = 0; j < pages.size(); j++)
        {
            int k = j + 1;
            while (k < pages.size())
            {
                if (m[pages[k]][pages[j]])
                {
                    break;
                }
                k++;
            }
            if (k < pages.size())
            {
                valid = false;
            }
        }
        if (!valid)
        {
            // cout <<i<<" "<< pages[pages.size() / 2] << endl;
            for (int j = 0; j < pages.size(); j++)
            {
                int k = j + 1;
                while (k < pages.size())
                {
                    if (m[pages[k]][pages[j]])
                    {
                        int x = pages[k];
                        pages[k] = pages[j];
                        pages[j] = x;
                    }
                    k++;
                }
            }
            ans += (pages[pages.size() / 2]);
        }
    }
    cout << ans << endl;
    return 0;
}