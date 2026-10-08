#include <iostream>

struct A 
{
    int* ptr{};
};

int main() 
{
    int* p = new int{555};
    A a{p};

    std::cout << "Before delete:\n";
    std::cout << "  p     = " << static_cast<const void*>(p) << '\n';
    std::cout << "  a.ptr = " << static_cast<const void*>(a.ptr) << '\n';

    delete p;
    p = nullptr; // member alias is unaffected

    std::cout << "After delete + p = nullptr:\n";
    std::cout << "  p     = " << static_cast<const void*>(p) << '\n';
    std::cout << "  a.ptr = " << static_cast<const void*>(a.ptr) << "  <-- dangling\n";

    // std::cout << *a.ptr << '\n'; // UB: dangling pointer
}
