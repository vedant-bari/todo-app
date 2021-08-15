The guard at the entrance door 

The coffee service and bill desk 

The table arranged for having coffee.

The waiters service .


class Coffee:
    def __init__(self,user_name):
        self.user_name = user_name
        self.type_of_coffe = None

    def service(self,type_of_coffe):
        self.type_of_coffe = type_of_coffe
        return self.type_of_coffe

    def _is_user_allowed(self):
        if self.user_name == "vedant":
            return True
        else:
            False      

    @static
    def greeting_after_coffe():
        return "Thankyou for visting the coffee shop"

coff = Coffee()
coff.service("capicino")
print(coff.type_of_coffe)
