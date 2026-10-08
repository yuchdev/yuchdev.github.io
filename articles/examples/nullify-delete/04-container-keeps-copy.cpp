#include <iostream>
#include <vector>

int main() 
{
    int* p = new int{123};
    std::vector<int*> v;
    v.push_back(p);

    std::cout << "Before delete:\n";
    std::cout << "  p    = " << static_cast<const void*>(p) << '\n';
    std::cout << "  v[0] = " << static_cast<const void*>(v[0]) << '\n';

    delete p;
    p = nullptr; // vector element is unaffected

    std::cout << "After delete + p = nullptr:\n";
    std::cout << "  p    = " << static_cast<const void*>(p) << '\n';
    std::cout << "  v[0] = " << static_cast<const void*>(v[0]) << "  <-- dangling\n";

    // std::cout << *v[0] << '\n'; // UB: dangling pointer
}
