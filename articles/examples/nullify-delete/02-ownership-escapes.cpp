#include <iostream>

int* allocate() 
{
    return new int{7};
}

void destroy(int* p) 
{
    delete p;
    p = nullptr; // only the local copy inside destroy()
}

int main() 
{
    int* x = allocate();

    std::cout << "Before destroy:\n";
    std::cout << "  x = " << static_cast<const void*>(x) << '\n';

    destroy(x);

    std::cout << "After destroy(x):\n";
    std::cout << "  x = " << static_cast<const void*>(x) << "  <-- still dangling\n";

    // std::cout << *x << '\n'; // UB: dangling pointer
}
