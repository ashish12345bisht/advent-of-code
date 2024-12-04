with open('day4.txt', 'r') as file:
    content = file.read()
# print(content)

rows = content.split('\n')

directions = [
    [
        [0,0,0], #forward vertical
        [1,2,3]
    ],
    [
        [0,0,0], #backward vertical
        [-1,-2,-3]
    ],
    [
        [1,2,3], #forward horizontal
        [0,0,0]
    ],
    [
        [-1,-2,-3], #backward horizontal
        [0,0,0]
    ],
    [
        [1,2,3], #southeast
        [1,2,3]
    ],
    [
        [-1,-2,-3], #northwest
        [-1,-2,-3]
    ],
    [
        [1,2,3], #northeast
        [-1,-2,-3]
    ],
    [
        [-1,-2,-3], #southwest
        [1,2,3]
    ],
]
s = ['M', 'A', 'S']
ans1 = 0

# part one
for i in range(len(rows)):  # Iterates from 0 to 4
    for j in range(len(rows[i])):
        if rows[i][j]=='X':
            for direction in directions:
                valid = 1
                for k in range(3):
                    r = i+direction[0][k]
                    c = j+direction[1][k]
                    if (r<0 or r>=len(rows) or c<0 or c>=len(rows[i]) or rows[r][c]!=s[k]):
                        valid = 0
                        break
                if valid:
                    ans1+=1
    
print(ans1)


ans2 = 0
# part two
for i in range(len(rows)):  # Iterates from 0 to 4
    for j in range(len(rows[i])):
        if rows[i][j]=='A':
            r1 = i-1
            c1 = j-1
            r2 = i+1
            c2 = j+1
            r3 = i+1
            c3 = j-1
            r4 = i-1
            c4 = j+1
            if (r1<0 or r1>=len(rows) or c1<0 or c1>=len(rows[i]) or r2<0 or r2>=len(rows) or c2<0 or c2>=len(rows[i])):
                continue
            if (r3<0 or r3>=len(rows) or c3<0 or c3>=len(rows[i]) or r4<0 or r4>=len(rows) or c4<0 or c4>=len(rows[i])):
                continue
            d1 = rows[r1][c1] + rows[i][j] + rows[r2][c2]
            d2 = rows[r3][c3] + rows[i][j] + rows[r4][c4]
            if (d1!="MAS" and d1!="SAM"):
                continue
            if (d2!="MAS" and d2!="SAM"):
                continue
            # print()
            ans2+=1
print(ans2)
            
