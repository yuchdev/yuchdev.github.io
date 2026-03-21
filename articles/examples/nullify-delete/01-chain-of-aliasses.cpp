#include <iostream>

int main() 
{
    int* p = new int{42};
    int* p2 = p;

    std::cout << "Before delete:\n";
    std::cout << "  p  = " << static_cast<const void*>(p) << '\n';
    std::cout << "  p2 = " << static_cast<const void*>(p2) << '\n';

    delete p;
    p = nullptr; // only this variable is changed

    std::cout << "After delete + p = nullptr:\n";
    std::cout << "  p  = " << static_cast<const void*>(p) << '\n';
    std::cout << "  p2 = " << static_cast<const void*>(p2) << "  <-- dangling\n";

    // std::cout << *p2 << '\n'; // UB: dangling pointer
}
