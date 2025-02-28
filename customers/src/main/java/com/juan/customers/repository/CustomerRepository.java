package com.juan.customers.repository;

import com.juan.customers.entities.Customer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Integer> {

    @Query("SELECT c FROM Customer c WHERE c.email LIKE %:email% OR c.address LIKE %:address%")
    List<Customer> findByEmailOrAddress(@Param("email") String email, @Param("address") String address);

}
