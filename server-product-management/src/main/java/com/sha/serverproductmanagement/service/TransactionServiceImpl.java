package com.sha.serverproductmanagement.service;

import com.sha.serverproductmanagement.model.Transaction;
import com.sha.serverproductmanagement.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional //It is not necessary. You can use it, if you have multiple database operation in a single service method.
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public Transaction saveTransaction(final Transaction transaction){
        return transactionRepository.save(transaction);
    }

    @Override
    public Long numberOfTransactions(){
        return transactionRepository.count();
    }

    @Override
    public List<Transaction> findAllTransactions(){
        return transactionRepository.findAll();
    }
}
